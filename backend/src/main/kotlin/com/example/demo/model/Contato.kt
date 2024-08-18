package com.example.demo.model

import jakarta.persistence.*

@Entity
@Table(name = "contatos")
data class Contato(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    var nome: String,
    var email: String,
    var telefone: String,
    var imagem: String? = null
)
