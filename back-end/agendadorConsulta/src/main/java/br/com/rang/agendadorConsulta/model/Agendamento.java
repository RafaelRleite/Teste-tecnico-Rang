package br.com.rang.agendadorConsulta.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.rang.agendadorConsulta.model.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "agendamento")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agendamento implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "dt_marcacao")
	private LocalDateTime dt_marcacao;

	@NotNull
	@Column(name = "status")
	private Status status;
	
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "dt_criacao_agendamento")
	private LocalDateTime dt_criacao_agendamento;

	/**
	 * Anotação que serve para serializar classes encadiadas evitando ciclos. No json do agendamento também teria os dados do médico.
	 */
//	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
	@JoinColumn(name = "medico")
	@ManyToOne
	private Medico medico;

}