package com.example.demo.repository

import com.example.demo.model.Contato
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ContatoRepository : JpaRepository<Contato, Long>
