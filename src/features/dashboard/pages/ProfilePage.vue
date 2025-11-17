<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { User, Mail, Phone, Camera, Loader2, CheckCircle } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import Skeleton from 'primevue/skeleton';
import { useAuthStore } from '@/stores/auth.store';
import { useUpdateProfile, useUploadAvatar } from '../composables/useProfile';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();
const toast = useToast();
const authStore = useAuthStore();

const updateProfileMutation = useUpdateProfile();
const uploadAvatarMutation = useUploadAvatar();

const isEditing = ref(false);
const form = ref({
  first_name: '',
  last_name: '',
  phone: '',
});

const user = computed(() => authStore.currentUser);

const userInitials = computed(() => {
  if (!user.value) return 'U';
  return ((user.value.first_name?.[0] || '') + (user.value.last_name?.[0] || '')).toUpperCase() || user.value.email?.[0]?.toUpperCase() || 'U';
});

const userTypeLabels: Record<string, string> = {
  end_user: 'profile.userType.endUser',
  owner: 'profile.userType.owner',
  agent: 'profile.userType.agent',
  agency_admin: 'profile.userType.agencyAdmin',
  platform_admin: 'profile.userType.platformAdmin',
  super_admin: 'profile.userType.superAdmin',
};

function startEditing() {
  if (!user.value) return;
  form.value = {
    first_name: user.value.first_name || '',
    last_name: user.value.last_name || '',
    phone: user.value.phone || '',
  };
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
}

async function handleSubmit() {
  try {
    await updateProfileMutation.mutateAsync(form.value);
    toast.add({ severity: 'success', summary: t('profile.updateSuccess'), life: 5000 });
    isEditing.value = false;
  } catch {
    toast.add({ severity: 'error', summary: t('profile.updateError'), life: 5000 });
  }
}

async function handleAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    toast.add({ severity: 'error', summary: t('profile.avatar.invalidType'), life: 5000 });
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.add({ severity: 'error', summary: t('profile.avatar.tooLarge'), life: 5000 });
    return;
  }

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    await uploadAvatarMutation.mutateAsync(formData);
    toast.add({ severity: 'success', summary: t('profile.avatar.uploadSuccess'), life: 5000 });
  } catch {
    toast.add({ severity: 'error', summary: t('profile.avatar.uploadError'), life: 5000 });
  }

  input.value = '';
}
</script>

<template>
  <div data-testid="profile-page" class="space-y-6">
    <SEO :title="t('profile.title')" />

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ t('profile.title') }}</h1>
      <p class="text-gray-500">{{ t('profile.description') }}</p>
    </div>

    <!-- Loading skeleton -->
    <template v-if="!user">
      <div class="space-y-6">
        <div class="rounded-xl border bg-white p-6">
          <div class="flex items-center gap-6">
            <Skeleton shape="circle" size="6rem" />
            <div class="space-y-2">
              <Skeleton width="10rem" height="1.5rem" />
              <Skeleton width="12rem" height="1rem" />
              <Skeleton width="6rem" height="1.25rem" />
            </div>
          </div>
          <hr class="my-6" />
          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="i in 4" :key="i" class="space-y-2">
              <Skeleton width="6rem" height="1rem" />
              <Skeleton width="100%" height="2.5rem" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <!-- Profile Card -->
      <div class="rounded-xl border bg-white">
        <div class="border-b px-6 py-4">
          <h2 class="flex items-center gap-2 text-lg font-semibold">
            <User class="h-5 w-5" />
            {{ t('profile.personalInfo') }}
          </h2>
          <p class="text-sm text-gray-500">{{ t('profile.description') }}</p>
        </div>
        <div class="space-y-6 p-6">
          <!-- Avatar Section -->
          <div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div class="relative">
              <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-medium text-white">
                <img
                  v-if="user.avatar_url"
                  :src="user.avatar_url"
                  :alt="user.first_name"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ userInitials }}</span>
              </div>
              <label
                class="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary/90"
              >
                <Loader2 v-if="uploadAvatarMutation.isPending.value" class="h-4 w-4 animate-spin" />
                <Camera v-else class="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  :disabled="uploadAvatarMutation.isPending.value"
                  @change="handleAvatarChange"
                />
              </label>
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-semibold">{{ user.first_name }} {{ user.last_name }}</h3>
              <p class="text-sm text-gray-500">{{ user.email }}</p>
              <div class="mt-2 flex items-center gap-2">
                <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {{ t(userTypeLabels[user.user_type] || 'profile.userType.endUser') }}
                </span>
                <span
                  v-if="user.email_verified"
                  class="flex items-center gap-1 rounded-full border border-green-600 px-3 py-1 text-xs font-medium text-green-600"
                >
                  <CheckCircle class="h-3 w-3" />
                  {{ t('profile.emailVerified') }}
                </span>
              </div>
            </div>
          </div>

          <hr />

          <!-- Profile Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <!-- First Name -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">{{ t('profile.fields.firstName') }}</label>
                <input
                  v-if="isEditing"
                  v-model="form.first_name"
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
                  :disabled="updateProfileMutation.isPending.value"
                />
                <p v-else class="py-2 text-sm">{{ user.first_name }}</p>
              </div>

              <!-- Last Name -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">{{ t('profile.fields.lastName') }}</label>
                <input
                  v-if="isEditing"
                  v-model="form.last_name"
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
                  :disabled="updateProfileMutation.isPending.value"
                />
                <p v-else class="py-2 text-sm">{{ user.last_name }}</p>
              </div>

              <!-- Email (read-only) -->
              <div class="space-y-2">
                <label class="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Mail class="h-4 w-4" />
                  {{ t('profile.fields.email') }}
                </label>
                <p class="py-2 text-sm text-gray-500">{{ user.email }}</p>
                <p class="text-xs text-gray-400">{{ t('profile.emailReadOnly') }}</p>
              </div>

              <!-- Phone -->
              <div class="space-y-2">
                <label class="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Phone class="h-4 w-4" />
                  {{ t('profile.fields.phone') }}
                </label>
                <input
                  v-if="isEditing"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+41 XX XXX XX XX"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
                  :disabled="updateProfileMutation.isPending.value"
                />
                <p v-else class="py-2 text-sm">
                  {{ user.phone || '' }}
                  <span v-if="!user.phone" class="text-gray-400">{{ t('profile.notProvided') }}</span>
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-3 pt-4">
              <template v-if="isEditing">
                <button
                  type="button"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  :disabled="updateProfileMutation.isPending.value"
                  @click="cancelEditing"
                >
                  {{ t('common.cancel') }}
                </button>
                <button
                  type="submit"
                  class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                  :disabled="updateProfileMutation.isPending.value"
                >
                  <Loader2 v-if="updateProfileMutation.isPending.value" class="h-4 w-4 animate-spin" />
                  {{ t('common.save') }}
                </button>
              </template>
              <button
                v-else
                type="button"
                class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                @click="startEditing"
              >
                {{ t('profile.editProfile') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Account Info Card -->
      <div class="rounded-xl border bg-white">
        <div class="border-b px-6 py-4">
          <h2 class="text-lg font-semibold">{{ t('profile.accountInfo', 'Account Information') }}</h2>
        </div>
        <div class="p-6">
          <dl class="grid gap-4 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">{{ t('profile.fields.memberSince') }}</dt>
              <dd class="mt-1 text-sm">
                {{ new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">{{ t('profile.fields.accountStatus') }}</dt>
              <dd class="mt-1">
                <span
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                >
                  {{ user.status === 'active' ? t('profile.status.active') : t('profile.status.inactive') }}
                </span>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">{{ t('profile.fields.preferredLanguage') }}</dt>
              <dd class="mt-1 text-sm capitalize">{{ user.preferred_language }}</dd>
            </div>
            <div v-if="user.agency || user.agency_id">
              <dt class="text-sm font-medium text-gray-500">{{ t('profile.fields.agency') }}</dt>
              <dd class="mt-1 text-sm">{{ user.agency?.name || user.agency_id }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </template>
  </div>
</template>
