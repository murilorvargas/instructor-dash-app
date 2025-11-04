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

  updateDescription(description: string) {
    this.instructor!.instructor_description = description
  }
}

export const instructorStore = new InstructorStore()

