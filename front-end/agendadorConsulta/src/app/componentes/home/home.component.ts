import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registroForm!: FormGroup;
  esconder = true;

  constructor(
    private service: AutenticacaoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: [1],
      nomeCompleto: [''],
      identidade: [''],
    });
  }

  registrar() {
    this.tirarEspaçosVazios('login'), this.tirarEspaçosVazios('password');
    console.log(this.registroForm.value);
    this.service.registrar(this.registroForm.value).subscribe({
      next: (response) => {
        if (response.statusText === 'OK') {
          this._snackBar.open('Registro realizado com sucesso', 'Fechar', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'custom-snackbar',
          });
        }
      },
      error: () => {
        this._snackBar.open('Ocorreu um erro no Registro', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'custom-snackbar',
        });
      },
      complete: () => {
        this.registroForm.removeControl('role');
        this.service.login(this.registroForm.value).subscribe({
          next: (response) => {
            if (response?.user) {
              this.router.navigate(['criarAgendamento']);
              this._snackBar.open('Bem vindo!', 'Fechar', {
                duration: 5000,
                verticalPosition: 'top',
                panelClass: 'custom-snackbar',
              });
            }
          },
          error: () =>
            this._snackBar.open('Ocorreu um erro no Login', 'Fechar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'custom-snackbar',
            }),
        });
      },
    });
  }

  private tirarEspaçosVazios(campo: string) {
    const campoControl = this.registroForm.get(campo)?.value;
    const campoControlSemEspacos = campoControl.replace(' ', '').trim();
    this.registroForm.get(campo)?.setValue(campoControlSemEspacos);
  }
}
