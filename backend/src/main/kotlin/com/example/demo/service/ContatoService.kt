package com.example.demo.service

import com.example.demo.repository.ContatoRepository
import com.example.demo.model.Contato
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.util.*

@Service
class ContatoService(private val contatoRepository: ContatoRepository) {

    fun getAllContatos(): List<Contato> {
        return contatoRepository.findAll()
    }

    fun getContatoById(id: Long): Contato? {
        val contato: Optional<Contato> = contatoRepository.findById(id)
        return if (contato.isPresent) {
            contato.get()
        } else {
            null
        }
    }

    fun deleteContato(id: Long): Boolean {
        return try {
            contatoRepository.deleteById(id)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun createContato(nome: String, email: String, telefone: String, imagem: String?): Contato {
        val contato = Contato(
            nome = nome,
            email = email,
            telefone = telefone,
            imagem = imagem
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
            contato.imagem = updatedContato.imagem
            contatoRepository.save(contato)
        } else {
            null
        }
    }
}
