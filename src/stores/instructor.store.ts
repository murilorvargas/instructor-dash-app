import { makeAutoObservable } from 'mobx'

import type { InstructorResponse } from '@/services/instructor/instructor.types'

class InstructorStore {
  instructor: InstructorResponse | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setInstructor(instructor: InstructorResponse) {
    this.instructor = instructor
  }
}

export const instructorStore = new InstructorStore()

