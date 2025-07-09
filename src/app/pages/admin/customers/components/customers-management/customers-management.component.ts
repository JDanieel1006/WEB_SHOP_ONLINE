import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomersService } from '../../../../../services/Customers/Customers.service';
import { CustomerSubmissionDto } from '../../../../../model/Customers/CustomerSubmissionDto.model';
import { Subscription } from 'rxjs';
import { ModelCustomerTransferService } from '../../services/ModelCustomerTransfer';
import { RefreshTableCustomersService } from '../../services/RefreshTableCustomers.service';

@Component({
  selector: 'customers-management',
  imports: [FormsModule,CommonModule,
            Dialog, ButtonModule, InputTextModule, PasswordModule, DividerModule,
            ReactiveFormsModule, ToastModule, FloatLabelModule, RadioButtonModule, InputMaskModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './customers-management.component.html',
  styleUrl: './customers-management.component.scss'
})
export class CustomersManagementComponent {

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
    public customerId: number = 0;
    public userForm: FormGroup;
    private subscription!: Subscription;

    /**
     * Injection of services
    */
    private customersService = inject(CustomersService);
    private messageService = inject(MessageService);
    private modelCustomerTransferService = inject(ModelCustomerTransferService);
    private refreshTableService = inject(RefreshTableCustomersService);
    private fb = inject(FormBuilder);


    constructor() {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required]
        });
     }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.subscription = this.modelCustomerTransferService.refreshModel$.subscribe((model) => {
            if (model) {
                this.visible = true;
                this.customerId = model.id;
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
        this.customerId === 0 ? this.Create() : this.Update();
    }

    public HideDialog() {
        this.userForm.reset();
        this.modelCustomerTransferService.clearModel();
        this.customerId = 0;
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    private GetById(id: number){
        this.customersService.GetById(id).subscribe({
            next: (res) => {
                this.customerId = res.id;
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
        const dto : CustomerSubmissionDto = {
            name: this.userForm.value.name,
            lastName: this.userForm.value.lastName,
            address: this.userForm.value.address
        };
        this.customersService.Create(dto).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Cliente ${res.name} creado con exito`
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
        const dto : CustomerSubmissionDto = {
            name: this.userForm.value.name,
            lastName: this.userForm.value.lastName,
            address: this.userForm.value.address
        };
        this.customersService.Update(this.customerId,dto).subscribe({
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
