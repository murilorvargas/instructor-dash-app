import { makeAutoObservable } from 'mobx'

import type { PersonResponse } from '@/services/person/person.types'

class PersonStore {
  person: PersonResponse | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setPerson(person: PersonResponse) {
    this.person = person
  }
}

export const personStore = new PersonStore()

