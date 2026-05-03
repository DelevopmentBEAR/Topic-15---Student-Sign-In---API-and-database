<script setup>

// Importing components for use in the main App component
import { onMounted } from 'vue';

import NewStudentForm from './components/NewStudentForm.vue';
import StudentTable from './components/StudentTable.vue';
import StudentMessage from './components/StudentMessage.vue';

import { useStudentStore } from './stores/StudentStore.js';

// Create an instance of the student store to access its state and functions
const studentStore = useStudentStore();

onMounted(() => {
    // whatever is in here will run when the component is mounted (when the page loads)
    studentStore.getAllStudents(); 
    // call the getAllStudents function from the student store to fetch the list of students from the API when the component is mounted
})

</script>

<template>

    <NewStudentForm />

    <StudentTable />

    <StudentMessage />

</template>
<style scoped>

    /* CSS styles here */ 
      
</style>