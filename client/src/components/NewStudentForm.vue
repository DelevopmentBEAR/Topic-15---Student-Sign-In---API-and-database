<script setup>

// Importing the ref function from Vue to create reactive data properties
import { ref, watch } from 'vue'

// Importing the student store to access the list of students and related actions
import { useStudentStore } from '../stores/StudentStore';
import { storeToRefs } from 'pinia';

// Using the student store to get the list of students and related actions
const studentStore = useStudentStore();

// These will hold the values of the new student form inputs
const newStudentName = ref('')
const newStarID = ref('')

// This will hold any errors from form validation
const formErrors = ref([])

// get the addNewStudentErrors from the student store to display any errors that occur when adding a new student
const { addNewStudentErrors } = storeToRefs (studentStore) 

// Watch for changes in addNewStudentErrors and update formErrors accordingly
watch(addNewStudentErrors, (newErrors) => {
    if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
        alert(addNewStudentErrors.value.join('\n')) // show an alert with the error messages
        formErrors.value = addNewStudentErrors.value // update formErrors with the errors from the store
    } else {
        formErrors.value = [] // clear formErrors if there are no errors in the store
    }
})

// This function will be called when the "Add" button is clicked
function addStudent() {

    formErrors.value = [] // reset form errors

    // Form validation: check if the name and star ID are not empty
    if (newStudentName.value === '') {
        formErrors.value.push('Name is required.')
    }

    if (newStarID.value === '') {
        formErrors.value.push('Star ID is required.')
    }

    // If there are no form errors, add the new student to the list
    if (formErrors.value.length === 0) {
        // Create a new student object
        let student = {
            name: newStudentName.value,
            StarID: newStarID.value,
            isPresent: false
        }

        // TODO: Add the new student to the list of students 
        // (this will likely involve emitting an event or updating a shared state)
        studentStore.addStudent(student)


        // Clears the form inputs
        newStudentName.value = ''
        newStarID.value = ''
    }
}

</script>

<template>
    <div id="new-student-form-errors" class="m-2">
        <!-- Shows errors from form validation by looping through the formErrors array -->
        <!-- v-if - only shows the errors if there are any -->
        <div v-if="formErrors.length > 0" class="alert alert-danger">
            <li v-for="error in formErrors" :key="error">
                {{ error }}
            </li>
        </div>
    </div>


<div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
        <label for="name">Name</label>
        <!-- v-model newStudentName connects the input to the reactive data -->
        <!-- .trim takes spaces off the ends -->
        <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">
        <label for="starID">Star ID</label>
        <!-- v-model newStarID connects the input to the reactive data -->
        <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- v-on:click event handler connected to the addStudent function -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
</div>


</template>
<style scoped>

    /* CSS styles here */ 
      
</style>