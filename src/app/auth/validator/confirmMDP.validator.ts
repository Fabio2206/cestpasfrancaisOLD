/***********
 * Comparaison entre un mot de passe entrée et la confirmation de mot de passe
 */

import { FormGroup } from '@angular/forms';

export function confirmMDP(motDePasse: string, confirmMotDePasse: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[motDePasse];
    const confirmControl = formGroup.controls[confirmMotDePasse];
    if (confirmControl.errors && !confirmControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== confirmControl.value) {
      confirmControl.setErrors({ confirmedValidator: true });
    } else {
      confirmControl.setErrors(null);
    }
  }
}
