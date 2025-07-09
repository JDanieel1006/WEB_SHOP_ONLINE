import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../../../services/Article/Article.service';
import { ModelArticleTransferService } from '../../services/ModelArticleTransfer.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { RefreshTableArticleService } from '../../services/RefreshTableArticle.service';

@Component({
  selector: 'article-management',
  imports: [FormsModule,CommonModule,
            Dialog, ButtonModule, InputTextModule, PasswordModule, DividerModule,
            ReactiveFormsModule, ToastModule, FloatLabelModule, RadioButtonModule, InputMaskModule,InputNumberModule, FileUploadModule ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './article-management.component.html',
  styleUrl: './article-management.component.scss'
})
export class ArticleManagementComponent {

    @ViewChild('fu') fu!: FileUpload;

    /**
     * @Input && @Output
    */
    @Input()
        public visible : boolean = false;
    @Output()
        public visibleChange = new EventEmitter<boolean>();

    /**
     * Global variables
    */
    public articleId: number = 0;
    public userForm: FormGroup;
    private subscription!: Subscription;
    private imageFile: File | null = null;
    public existingImageUrl: string | null = null;
    public newImageUrl: string | null = null;
    public previewUrl: string | null = null;

    /**
     * Injection of services
    */
    private articleService = inject(ArticleService);
    private messageService = inject(MessageService);
    private modelArticleTransferService = inject(ModelArticleTransferService);
    private refreshTableService = inject(RefreshTableArticleService);
    private fb = inject(FormBuilder);

    constructor() {
        this.userForm = this.fb.group({
            code: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            stock: ['', Validators.required],
            image: [null],
        });
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.subscription = this.modelArticleTransferService.refreshModel$.subscribe((model) => {
            if (model) {
                this.visible = true;
                this.articleId = model.id;
                this.GetById(model.id);
            }
        });
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onFileSelect(event: any) {
        const file = event.files[0];
        this.imageFile = file;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.newImageUrl = e.target.result;
            this.updatePreview();
        };
        reader.readAsDataURL(file);
    }

    public clearSelectedImage() {
        this.newImageUrl = null;
        this.imageFile = null;
        this.fu.clear();
        this.userForm.get('image')?.setValue(null);
        this.updatePreview();
    }

    private updatePreview() {
        if (this.newImageUrl) {
            this.previewUrl = this.newImageUrl;
        } else if (this.existingImageUrl) {
            this.previewUrl = this.existingImageUrl;
        } else {
            this.previewUrl = null;
        }
    }

    public OnFileSelect(event: any) {
        const file: File = event.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                this.userForm.get('image')?.setErrors({ invalidType: true });
                this.imageFile = null;
                return;
            }

            if (file.size > 10000000) {
                this.userForm.get('image')?.setErrors({ maxSize: true });
                this.imageFile = null;
                return;
            }

            this.userForm.get('image')?.setErrors(null);
            this.userForm.patchValue({ image: file });
            this.imageFile = file;
        }
    }

    public Save(){
        this.articleId === 0 ? this.Create() : this.Update();
    }

    public HideDialog() {
        this.previewUrl = null;
        this.existingImageUrl = null;
        this.clearSelectedImage();
        this.userForm.reset();
        this.modelArticleTransferService.clearModel();
        this.articleId = 0;
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    private GetById(id: number) {
        this.articleService.GetById(id).subscribe({
            next: (res) => {
                this.articleId = res.id;

                this.userForm.patchValue({
                    code: res.code,
                    description: res.description,
                    price: res.price,
                    stock: res.stock,
                });

                this.existingImageUrl = res.imageUrl || null;

                this.newImageUrl = null;
                this.imageFile = null;

                this.updatePreview();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to retrieve article data.',
                    life: 3000
                });
            }
        });
    }

    private Create(){
        const file = this.imageFile;
        const formData = new FormData();
        formData.append('code', this.userForm.get('code')?.value);
        formData.append('description', this.userForm.get('description')?.value);
        formData.append('price', this.userForm.get('price')?.value.toString());
        formData.append('stock', this.userForm.get('stock')?.value.toString());
        if (file) {
            formData.append('image', file);
        }

        this.articleService.Create(formData).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Artículo ${res.code} creado con exito`
                });
                this.refreshTableService.triggerRefresh();
                this.HideDialog();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create article.',
                    life: 3000
                });
            },
        });
    }

    private Update() {
        const formData = new FormData();
        formData.append('code', this.userForm.get('code')?.value);
        formData.append('description', this.userForm.get('description')?.value);
        formData.append('price', this.userForm.get('price')?.value.toString());
        formData.append('stock', this.userForm.get('stock')?.value.toString());

        if (this.imageFile) {
            formData.append('image', this.imageFile);
        }

        console.log('FormData:', formData);

        this.articleService.Update(this.articleId, formData).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Artículo ${res.code} actualizado con éxito`
                });
                this.refreshTableService.triggerRefresh();
                this.HideDialog();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update article.',
                    life: 3000
                });
            },
        });
    }
}
