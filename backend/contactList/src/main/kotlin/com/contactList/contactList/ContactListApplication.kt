package com.contactList.contactList

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ContactListApplication

fun main(args: Array<String>) {
	runApplication<ContactListApplication>(*args)
}
