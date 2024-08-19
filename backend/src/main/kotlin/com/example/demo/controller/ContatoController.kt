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
import java.util.UUID
import java.time.LocalDate

@RestController
@RequestMapping("/api/contatos")
class ContatoController(private val contatoService: ContatoService) {
    private val targetLocation: Path = Paths.get("backend/uploads")

    @GetMapping
    fun getAllContatos(): ResponseEntity<List<Contato>> {
        val contatos = contatoService.getAllContatos()
        return ResponseEntity.ok(contatos)
    }

    @GetMapping("/search")
    fun getContatoByParam(@RequestParam search: String?): List<Contato> {
        return contatoService.getContatoByParam(search)
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

    @PostMapping("")
    fun criarContato(
        @RequestParam("nome") nome: String,
        @RequestParam("email") email: String,
        @RequestParam("telefone") telefone: String,
        @RequestParam("dataNascimento") dataNascimento: LocalDate?,
        @RequestParam("imagem") imagem: MultipartFile?
    ): ResponseEntity<Contato> {
        return try {
            val novoContato = contatoService.createContato(nome, email, telefone, dataNascimento, imagem?.let{ saveImage(it)})
            ResponseEntity.status(HttpStatus.CREATED).body(novoContato)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @PutMapping("/{id}")
    fun atualizarContato(
        @PathVariable id: Long,
        @RequestParam("nome") nome: String,
        @RequestParam("email") email: String,
        @RequestParam("telefone") telefone: String,
        @RequestParam("dataNascimento") dataNascimento: LocalDate?,
        @RequestParam("imagem") imagem: MultipartFile?
    ): ResponseEntity<Contato> {
        val imagemPath = imagem?.let{ saveImage(it)}

        val contato = Contato(id, nome, email, telefone, imagemPath, dataNascimento)

        val contatoAtualizado = contatoService.updateContato(id, contato)
        return if (contatoAtualizado != null) {
            ResponseEntity.ok(contatoAtualizado)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    private fun saveImage(imagem: MultipartFile): String {
        val uuid = UUID.randomUUID().toString()

        val originalFilename = imagem.originalFilename!!
        val extension = originalFilename.substringAfterLast('.', "")

        val newFilename = if (extension.isNotEmpty()) {
            "$uuid.$extension"
        } else {
            uuid
        }

        val targetPath = targetLocation.resolve(newFilename)

        Files.createDirectories(targetLocation)
        imagem.inputStream.use { inputStream ->
            Files.copy(inputStream, targetPath)
        }

        return targetPath.toString()
    }
}