package com.example.demo.service

import com.example.demo.repository.ContatoRepository
import com.example.demo.model.Contato
import org.springframework.stereotype.Service
import java.util.*
import java.time.LocalDate

@Service
class ContatoService(private val contatoRepository: ContatoRepository) {

    fun getAllContatos(): List<Contato> {
        return contatoRepository.findAll()
    }

    fun getContatoByParam(search: String?): List<Contato> {
        return contatoRepository.getContatoByParam(search)
    }

    fun deleteContato(id: Long): Boolean {
        return try {
            contatoRepository.deleteById(id)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun createContato(nome: String, email: String, telefone: String, dataNascimento: LocalDate?, imagem: String?): Contato {
        println("Data: {dataNascimento}")
        val contato = Contato(
            nome = nome,
            email = email,
            telefone = telefone,
            dataNascimento = dataNascimento,
            imagem = imagem,
        )

        return contatoRepository.save(contato)
    }
    fun updateContato(id: Long, updatedContato: Contato): Contato? {
        val existingContato: Optional<Contato> = contatoRepository.findById(id)
        return if (existingContato.isPresent) {
            val contato = existingContato.get()
            contato.nome = updatedContato.nome
            contato.email = updatedContato.email
            contato.telefone = updatedContato.telefone
            contato.dataNascimento = updatedContato.dataNascimento
            contato.imagem = updatedContato.imagem
            return contatoRepository.save(contato)
        } else {
            null
        }
    }
}
