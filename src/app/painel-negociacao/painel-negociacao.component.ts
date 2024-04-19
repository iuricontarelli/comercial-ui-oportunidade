import { OportunidadeService } from '../../service/oportunidade.service';
import { Component, OnInit } from '@angular/core';
import { Oportunidade } from '../../interfaces/oportunidade.interface';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrl: './painel-negociacao.component.css'
})
export class PainelNegociacaoComponent implements OnInit{
  
  // nome = 'Iuri';
  // oportunidades = [
  //   {descricao: 'Projeto de desenvolvimento de ERP', nomeProspecto: 'João', valor: 10000},
  //   {descricao: 'Manutenção de CRM por 1 ano', nomeProspecto: 'Zé Santos', valor: 900000},
  // ];

  oportunidade = {
    descricao: null,
    nomeProspecto: null,
    valor: null,
  };
  oportunidades: Oportunidade[] = [];

  constructor(
    private oportunidadeService: OportunidadeService,
    private messageService: MessageService,
  ) {}
  
  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.oportunidadeService.listar().subscribe(
      resposta => this.oportunidades = resposta,
      error => console.error('Erro ao buscar oportunidades', error)
    );
  }

  adicionar() {
    this.oportunidadeService.adicionar(this.oportunidade).subscribe(() => {
      this.oportunidade = {
        descricao: null,
        nomeProspecto: null,
        valor: null,
      };
      this.consultar();

      this.messageService.add({
        severity: 'success',
        summary: 'Oportunidade adicionada com sucesso',
      });
    },
    resposta => {
      let msg = 'Erro inesperado. Tente novamente.';

      if (resposta.error.message) {
        msg = resposta.error.message
      }

      this.messageService.add({
        severity: 'error',
        summary: msg,
      });
    });
  }

  excluir(id: number) {
    this.oportunidadeService.excluir(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Oportunidade excluída com sucesso',
        });
        this.consultar(); // Atualiza a lista de oportunidades
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao excluir a oportunidade',
          detail: 'Não foi possível excluir a oportunidade, tente novamente mais tarde.'
        });
      }
    });
  }

  editar(oportunidade: Oportunidade) {
    oportunidade.editando = true; // Ativa a edição para a linha específica
  }

  cancelarEdicao(oportunidade: Oportunidade) {
    oportunidade.editando = false;
    this.consultar(); // Recarrega os dados originais do servidor para descartar mudanças
  }

  confirmarEdicao(oportunidade: Oportunidade) {
    this.oportunidadeService.atualizar(oportunidade.id, oportunidade).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Oportunidade atualizada com sucesso',
        });
        oportunidade.editando = false; // Desativa a edição após a atualização
        this.consultar(); // Atualiza a lista para refletir as mudanças
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao atualizar a oportunidade',
          detail: 'Não foi possível atualizar a oportunidade, tente novamente mais tarde.'
        });
      }
    });
  }

  
}