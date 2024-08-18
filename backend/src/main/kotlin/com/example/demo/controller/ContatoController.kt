package com.example.demo.controller

import com.example.demo.model.Contato
import com.example.demo.service.ContatoService
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths


@RestController
@RequestMapping("/api/contatos")
class ContatoController(private val contatoService: ContatoService) {
    private val targetLocation: Path = Paths.get("backend/uploads")

    @GetMapping
    fun getAllContatos(): ResponseEntity<List<Contato>> {
        val contatos = contatoService.getAllContatos()
        return ResponseEntity.ok(contatos)
    }

    @GetMapping("/{id}")
    fun getContatoById(@PathVariable id: Long): ResponseEntity<Contato> {
        val contato = contatoService.getContatoById(id)
        return if (contato != null) {
            ResponseEntity.ok(contato)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteContato(@PathVariable id: Long): ResponseEntity<Void> {
        val deletado = contatoService.deleteContato(id)
        return if (deletado) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    fun criarContato(
        @RequestParam("nome") nome: String,
        @RequestParam("email") email: String,
        @RequestParam("telefone") telefone: String,
        @RequestParam("imagem") imagem: MultipartFile?
    ): ResponseEntity<Contato> {
        return try {
            val novoContato = contatoService.createContato(nome, email, telefone, imagem?.let{ saveImage(it)})
            ResponseEntity.status(HttpStatus.CREATED).body(novoContato)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @PutMapping("/{id}") // PUT /api/contatos/{id}
    fun atualizarContato(@PathVariable id: Long, @RequestBody contato: Contato): ResponseEntity<Contato> {
        val contatoAtualizado = contatoService.updateContato(id, contato)
        return if (contatoAtualizado != null) {
            ResponseEntity.ok(contatoAtualizado)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    private fun saveImage(imagem: MultipartFile): String {

        val targetPath = targetLocation.resolve(imagem.originalFilename!!)
        Files.createDirectories(targetLocation)
        imagem.inputStream.use { inputStream ->
            Files.copy(inputStream, targetPath)
        }
        return targetPath.toString()
    }
}