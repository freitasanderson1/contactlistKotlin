package com.example.demo.controller

import com.example.demo.model.Contato
import com.example.demo.repository.ContatoRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/contatos")
class ContatoController(private val contatoRepository: ContatoRepository) {

    @GetMapping
    fun listarTodos(): List<Contato> = contatoRepository.findAll()

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun criarContato(
        @RequestParam nome: String,
        @RequestParam telefone: String,
        @RequestParam email: String,
        @RequestParam imagem: MultipartFile?
    ): Contato {
        val contato = Contato(
            nome = nome,
            telefone = telefone,
            email = email,
            imagem = imagem?.bytes
        )
        return contatoRepository.save(contato)
    }

    @PutMapping("/{id}")
    fun atualizarContato(
        @PathVariable id: Long,
        @RequestParam nome: String?,
        @RequestParam telefone: String?,
        @RequestParam email: String?,
        @RequestParam imagem: MultipartFile?
    ): Contato {
        val contatoExistente = contatoRepository.findById(id).orElseThrow { RuntimeException("Contato não encontrado") }
        val contatoAtualizado = contatoExistente.copy(
            nome = nome ?: contatoExistente.nome,
            telefone = telefone ?: contatoExistente.telefone,
            email = email ?: contatoExistente.email,
            imagem = imagem?.bytes ?: contatoExistente.imagem
        )
        return contatoRepository.save(contatoAtualizado)
    }
}
