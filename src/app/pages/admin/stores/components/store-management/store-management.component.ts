import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

@Component({
  selector: 'store-management',
  imports: [FormsModule,CommonModule,
              Dialog, ButtonModule, InputTextModule, PasswordModule, DividerModule,
              ReactiveFormsModule, ToastModule, FloatLabelModule, RadioButtonModule, InputMaskModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './store-management.component.html',
  styleUrl: './store-management.component.scss'
})
export class StoreManagementComponent {

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
            address: ['', Validators.required]
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
        const dto : StoreSubmissionDto = {
            name: this.userForm.value.name,
            address: this.userForm.value.address
        };
        this.storeService.Create(dto).subscribe({
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
                    detail: 'Failed to create customer.',
                    life: 3000
                });
                },
        });
    }

    private Update(){
        const dto : StoreSubmissionDto = {
            name: this.userForm.value.name,
            address: this.userForm.value.address
        };
        this.storeService.Update(this.storeId,dto).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Cliente ${res.name} actualizado con exito`
                });
                this.refreshTableService.triggerRefresh();
                this.HideDialog();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create customer.',
                    life: 3000
                });
                },
        });
    }
}
