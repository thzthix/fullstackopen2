import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"
import personService from "./services/persons"
import Notification from "./components/Notification"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [personsToShow, setPersonsToShow] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      setPersonsToShow(initialPersons)
    })
  }, [])

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handlesearchFilter = (event) => {
    const updatedSearchFilter = event.target.value
    setSearchFilter(updatedSearchFilter)

    setPersonsToShow(
      persons.filter((person) =>
        person.name.toLowerCase().includes(updatedSearchFilter.toLowerCase())
      )
    )
  }

  // 기존 사용자 정보 업데이트
  const updatePerson = (personToUpdate) => {
    const updatedPersonObjct = { ...personToUpdate, number: newNumber }
    personService
      .update(personToUpdate.id, updatedPersonObjct)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== personToUpdate.id ? p : returnedPerson))
        )
        setPersonsToShow(
          personsToShow.map((p) =>
            p.id !== personToUpdate.id ? p : returnedPerson
          )
        )
        setNewName("")
        setNewNumber("")
        setMessage(`changed ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        handleUpdateError(personToUpdate)
      })
  }

  // 새로운 사용자 추가
  const addNewPerson = () => {
    const newPersonObjct = {
      name: newName,
      number: newNumber,
      id: JSON.stringify(persons.length + 1),
    }
    personService.create(newPersonObjct).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setPersonsToShow(personsToShow.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
      setMessage(`added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  // 업데이트 시 에러 처리
  const handleUpdateError = (personToUpdate) => {
    setMessage(`Information of ${newName} has already deleted from server.`)
    setIsError(true)
    setPersons(persons.filter((p) => p.id !== personToUpdate.id))
    setPersonsToShow(personsToShow.filter((p) => p.id !== personToUpdate.id))
    setTimeout(() => {
      setIsError(false)
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find((p) => p.name === newName)

    if (personToUpdate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(personToUpdate)
      }
    } else {
      addNewPerson()
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deletePerson(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id))
        setPersonsToShow(personsToShow.filter((p) => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter onChange={handlesearchFilter} value={searchFilter} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        handlePersonChange={handlePersonChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
