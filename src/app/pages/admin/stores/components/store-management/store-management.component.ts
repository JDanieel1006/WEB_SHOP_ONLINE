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
import { StoreService } from '../../../../../services/Store/Store.service';
import { ModelStoreTransferService } from '../../services/ModelStoreTransfer.service';
import { StoreSubmissionDto } from '../../../../../model/Store/StoreSubmissionDto.model';
import { RefreshTableStoresService } from '../../services/RefreshTableStores.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'store-management',
  imports: [FormsModule,CommonModule,
              Dialog, ButtonModule, InputTextModule, PasswordModule, DividerModule,
              ReactiveFormsModule, ToastModule, FloatLabelModule, RadioButtonModule, InputMaskModule, FileUploadModule ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './store-management.component.html',
  styleUrl: './store-management.component.scss'
})
export class StoreManagementComponent {

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
    public storeId: number = 0;
    public userForm: FormGroup;
    private subscription!: Subscription;
    private imageFile: File | null = null;
    public existingImageUrl: string | null = null;
    public newImageUrl: string | null = null;
    public previewUrl: string | null = null;

    /**
     * Injection of services
    */
    private storeService = inject(StoreService);
    private messageService = inject(MessageService);
    private modelStoreTransferService = inject(ModelStoreTransferService);
    private refreshTableService = inject(RefreshTableStoresService);
    private fb = inject(FormBuilder);


    constructor() {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            image: [null],
        });
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.subscription = this.modelStoreTransferService.refreshModel$.subscribe((model) => {
            if (model) {
                this.visible = true;
                this.storeId = model.id;
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

    public Save(){
        this.storeId === 0 ? this.Create() : this.Update();
    }

    public HideDialog() {
        this.userForm.reset();
        this.modelStoreTransferService.clearModel();
        this.storeId = 0;
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    private GetById(id: number){
        this.storeService.GetById(id).subscribe({
            next: (res) => {
                this.storeId = res.id;
                this.userForm.patchValue(res);

                this.existingImageUrl = res.imageUrl || null;

                this.newImageUrl = null;
                this.imageFile = null;

                this.updatePreview();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to retrieve customer data.',
                    life: 3000
                })
            }
        });
    }

    private Create(){
        const file = this.imageFile;
        const formData = new FormData();
        formData.append('name', this.userForm.get('name')?.value);
        formData.append('address', this.userForm.get('address')?.value);
        if (file) {
            formData.append('image', file);
        }

        this.storeService.Create(formData).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Tienda ${res.name} creada con exito`
                });
                this.refreshTableService.triggerRefresh();
                this.HideDialog();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create store.',
                    life: 3000
                });
                },
        });
    }

    private Update(){
        const file = this.imageFile;
        const formData = new FormData();
        formData.append('name', this.userForm.get('name')?.value);
        formData.append('address', this.userForm.get('address')?.value);
        if (file) {
            formData.append('image', file);
        }
        this.storeService.Update(this.storeId,formData).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Tienda ${res.name} actualizado con exito`
                });
                this.refreshTableService.triggerRefresh();
                this.HideDialog();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create store.',
                    life: 3000
                });
                },
        });
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
}
