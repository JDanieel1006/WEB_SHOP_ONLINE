import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogDto } from '../../model/Shared/Dialog/ConfirmDialogDto.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private confirmationService: ConfirmationService) {}

  confirm(event: Event, confirmDialogDto:ConfirmDialogDto): Observable<boolean> {
    const confirmationResult = new Subject<boolean>();

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: confirmDialogDto.message,
      header: confirmDialogDto.header,
      icon: 'pi pi-info-circle',
      rejectLabel: confirmDialogDto.labelReject,
      rejectButtonProps: {
        label: confirmDialogDto.labelReject,
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: confirmDialogDto.labelAccept,
        severity: confirmDialogDto.Severety,
      },
      accept: () => {
        confirmationResult.next(true);
        confirmationResult.complete();
      },
      reject: () => {
        confirmationResult.next(false);
        confirmationResult.complete();
      },
    });

    return confirmationResult.asObservable();
  }
}
