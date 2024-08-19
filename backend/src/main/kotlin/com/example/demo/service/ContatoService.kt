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

    fun createContato(nome: String, email: String, telefone: String, dataNascimento: LocalDate?, imagem: String?): Contato? {
//        println("Data: ${dataNascimento::class.simpleName} - ${telefone}")
        val existingContato = contatoRepository.findByTelefone(telefone)
        if (existingContato.isPresent) {
            throw IllegalArgumentException("Contato com telefone $telefone já existe.")
        }
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
        println("Data: ${updatedContato.dataNascimento} - ${updatedContato.telefone}")
        val existingContato = contatoRepository.findById(id)
        return if (existingContato.isPresent) {
            val contato = existingContato.get()
            contato.nome = updatedContato.nome
            contato.email = updatedContato.email
            contato.telefone = updatedContato.telefone
            contato.dataNascimento = updatedContato.dataNascimento

            if(!updatedContato.imagem.isNullOrEmpty()){
                contato.imagem = updatedContato.imagem
            }
            return contatoRepository.save(contato)
        } else {
            null
        }
    }
}
