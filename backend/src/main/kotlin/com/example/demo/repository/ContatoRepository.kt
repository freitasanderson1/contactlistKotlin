package com.example.demo.repository

import com.example.demo.model.Contato
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface ContatoRepository : JpaRepository<Contato, Long> {
    @Query("SELECT c FROM Contato c WHERE " +
            "(:search IS NULL OR c.nome LIKE %:search% OR c.email LIKE %:search% OR c.telefone LIKE %:search%)")
    fun getContatoByParam(@Param("search") search: String?): List<Contato>
    fun findByTelefone(telefone: String): Optional<Contato>

}