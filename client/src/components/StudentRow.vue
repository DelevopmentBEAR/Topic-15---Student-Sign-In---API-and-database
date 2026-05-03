<script setup>

// Importing the ref function from Vue to create reactive data properties
import { ref } from 'vue';

// defineProps is used to define the props that this component will receive from its parent component
// In this case, the StudentRow component will receive a student object, a deleteStudent function, and an arrivedOrLeft function as props
const props = defineProps({
    student: Object,
    deleteStudent: Function,
    arrivedOrLeft: Function
})

const emit = defineEmits(['arrived-or-left', 'delete-student']);

const isStudentPresent = ref(props.student.isPresent); 
// This will hold the presence status of the student, initialized from the student prop

// This function will be called when the checkbox for student presence is changed
const notifyArrivedOrLeft = () => {
    // tell parent that student arrived or left -emit an event with the student object as payload
    emit('arrived-or-left', props.student, isStudentPresent.value);
}

// This function will be called when the delete button is clicked
const confirmThenDeleteStudent = () => {
    emit('delete-student', props.student);
}

</script>

<template>

<!-- v-for loops through students in sortedStudentList -->
<tr class="align-middle" v-bind:class="{ present: student.isPresent, absent: !student.isPresent }">
    <!-- Gets the student's name -->
    <td>{{ student.name }}</td>
    <!-- Gets the student's Star ID -->
    <td>{{ student.StarID }}</td>
    <!-- Checkbox for student presence -->
    <td>
        <!-- TODO: v-model checkbox -->
        <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
        <span v-if="student.isPresent" class="mx-1">Here!</span>
        <span v-else class="mx-1">Not present</span>
    </td>
    <!-- Delete button -->
    <td>
        <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
            <i class="bi bi-trash-fill"></i> Delete
        </button>
    </td>
</tr>

</template> 

<style scoped>

/* Moved these styles from StudentTable.vue to here*/
.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: lightcoral;
    font-weight: bold;
}

</style>
