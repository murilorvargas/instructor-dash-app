'use client'

import React from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import { personStore } from '@/stores/person.store'
import { instructorStore } from '@/stores/instructor.store'

export const ProfileHeader: React.FC = observer(() => {
  const person = personStore.person!
  const instructor = instructorStore.instructor!

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 shadow-lg w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full">
            {instructor.instructor_profile_photo_url ? (
              <img
                src={instructor.instructor_profile_photo_url}
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover border-2 sm:border-4 border-primary/30 shadow-lg"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary/20 border-2 sm:border-4 border-primary/30 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                  {person.first_name[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left w-full min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 break-words">
            {person.first_name} {person.last_name}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="break-all">{person.email}</span>
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 break-words">
            {instructor.instructor_description}
          </p>
        </div>
      </div>
    </div>
  )
})

