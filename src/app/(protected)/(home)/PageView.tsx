'use client'

import React from 'react'

import { AddressCard } from './components/address-card'
import { DriverLicenseCard } from './components/driver-license-card'
import { InstructorDescriptionCard } from './components/instructor-description-card'
import { PersonalInfoCard } from './components/personal-info-card'
import { ProfessionalCertificateCard } from './components/professional-certificate-card'
import { ProfileHeader } from './components/profile-header'
import { ProfilePagelAlert } from './components/profile-page-alert'

interface PageViewProps {
  editDescriptionOpen: boolean
  onEditDescriptionOpen: () => void
  onEditDescriptionClose: () => void
  description: string
  onDescriptionChange: (value: string) => void
  onDescriptionSubmit: (e: React.FormEvent) => void
  descriptionLoading: boolean
  descriptionError?: string
}

export const PageView: React.FC<PageViewProps> = ({
  editDescriptionOpen,
  onEditDescriptionOpen,
  onEditDescriptionClose,
  description,
  onDescriptionChange,
  onDescriptionSubmit,
  descriptionLoading,
  descriptionError,
}) => {
  return (
    <div className="py-4 px-3 sm:py-6 sm:px-4 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 break-words">
            Dashboard do Instrutor
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Informações pessoais e profissionais
          </p>
        </div>

        <ProfileHeader />

        <ProfilePagelAlert />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InstructorDescriptionCard
            editOpen={editDescriptionOpen}
            onEditOpen={onEditDescriptionOpen}
            onEditClose={onEditDescriptionClose}
            description={description}
            onDescriptionChange={onDescriptionChange}
            onSubmit={onDescriptionSubmit}
            loading={descriptionLoading}
            error={descriptionError}
          />
          <PersonalInfoCard />
          <AddressCard />
          <DriverLicenseCard />
          <ProfessionalCertificateCard />
        </div>
      </div>
    </div>
  )
}