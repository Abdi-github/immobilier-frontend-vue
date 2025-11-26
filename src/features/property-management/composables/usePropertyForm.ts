import { reactive, ref, computed } from 'vue';
import type {
  PropertyFormState,
  PropertyFormErrors,
} from '../types';

const INITIAL_STATE: PropertyFormState = {
  currentStep: 1,
  source_language: 'en',
  category_id: '',
  transaction_type: 'rent',
  price: '',
  additional_costs: '',
  canton_id: '',
  city_id: '',
  address: '',
  postal_code: '',
  rooms: '',
  surface: '',
  title: '',
  description: '',
  amenities: [],
  imageFiles: [],
  imagePreviews: [],
  isSubmitting: false,
};

export function usePropertyForm(initialState?: Partial<PropertyFormState>) {
  const state = reactive<PropertyFormState>({
    ...INITIAL_STATE,
    ...initialState,
  });

  const errors = ref<PropertyFormErrors>({});

  const isFirstStep = computed(() => state.currentStep === 1);
  const isLastStep = computed(() => state.currentStep === 6);
  const totalSteps = 6;

  function setField<K extends keyof PropertyFormState>(key: K, value: PropertyFormState[K]) {
    (state as Record<string, unknown>)[key] = value;
    // Clear error for this field
    if (key in errors.value) {
      delete errors.value[key as string];
    }
  }

  function setFields(fields: Partial<PropertyFormState>) {
    Object.entries(fields).forEach(([key, value]) => {
      (state as Record<string, unknown>)[key] = value;
    });
  }

  function nextStep() {
    if (state.currentStep < totalSteps) {
      state.currentStep++;
    }
  }

  function prevStep() {
    if (state.currentStep > 1) {
      state.currentStep--;
    }
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= totalSteps) {
      state.currentStep = step;
    }
  }

  function toggleAmenity(amenityId: string) {
    const idx = state.amenities.indexOf(amenityId);
    if (idx >= 0) {
      state.amenities.splice(idx, 1);
    } else {
      state.amenities.push(amenityId);
    }
  }

  function addImages(files: File[]) {
    const remaining = 20 - state.imageFiles.length;
    const toAdd = files.slice(0, remaining);
    state.imageFiles.push(...toAdd);
    toAdd.forEach((file) => {
      state.imagePreviews.push(URL.createObjectURL(file));
    });
  }

  function removeImage(index: number) {
    if (state.imagePreviews[index]) {
      URL.revokeObjectURL(state.imagePreviews[index]);
    }
    state.imageFiles.splice(index, 1);
    state.imagePreviews.splice(index, 1);
  }

  function validateStep(step: number): boolean {
    const newErrors: PropertyFormErrors = {};

    switch (step) {
      case 1:
        if (!state.category_id) newErrors.category_id = 'Please select a property type';
        if (!state.transaction_type) newErrors.transaction_type = 'Please select transaction type';
        if (!state.price || Number(state.price) <= 0) newErrors.price = 'Please enter a valid price';
        break;
      case 2:
        if (!state.canton_id) newErrors.canton_id = 'Please select a canton';
        if (!state.city_id) newErrors.city_id = 'Please select a city';
        if (!state.address || state.address.length < 3) newErrors.address = 'Please enter the street address';
        break;
      case 3:
        if (!state.title || state.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
        if (!state.description || state.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
        break;
      case 4:
        // Amenities are optional
        break;
      case 5:
        if (state.imageFiles.length === 0) newErrors.images = 'Please upload at least one photo';
        break;
      case 6:
        // Re-validate all required fields
        if (!state.category_id) newErrors.category_id = 'Category is required';
        if (!state.price || Number(state.price) <= 0) newErrors.price = 'Price is required';
        if (!state.canton_id) newErrors.canton_id = 'Canton is required';
        if (!state.city_id) newErrors.city_id = 'City is required';
        if (!state.address || state.address.length < 3) newErrors.address = 'Address is required';
        if (!state.title || state.title.length < 5) newErrors.title = 'Title is required';
        if (!state.description || state.description.length < 20) newErrors.description = 'Description is required';
        break;
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  function reset() {
    // Revoke all preview URLs
    state.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    Object.assign(state, { ...INITIAL_STATE, amenities: [], imageFiles: [], imagePreviews: [] });
    errors.value = {};
  }

  return {
    state,
    errors,
    isFirstStep,
    isLastStep,
    totalSteps,
    setField,
    setFields,
    nextStep,
    prevStep,
    goToStep,
    toggleAmenity,
    addImages,
    removeImage,
    validateStep,
    reset,
  };
}

export type PropertyFormReturn = ReturnType<typeof usePropertyForm>;
