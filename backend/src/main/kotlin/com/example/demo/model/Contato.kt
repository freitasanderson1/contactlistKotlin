package com.example.demo.model

import jakarta.persistence.*

@Entity
@Table(name = "contatos")
data class Contato(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val nome: String,

    @Column(nullable = false)
    val telefone: String,

    @Column(nullable = false)
    val email: String,

    @Lob
    @Column(name = "imagem")
    val imagem: String? = null
)
