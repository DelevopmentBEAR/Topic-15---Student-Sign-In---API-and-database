<script setup>

// Importing the student store to access the list of students and related actions
import { useStudentStore } from '../stores/StudentStore';
// Using the student store to get the list of students and related actions
import { storeToRefs } from 'pinia';

// Get the student store instance
const studentStore = useStudentStore();
// Get the most recent student and related actions from the store
const { mostRecentStudent } = storeToRefs(studentStore);

</script>

<template>
<div id="welcome-or-goodbye-message" class="m-2">
    <!-- TODO show a message when student arrives or leaves  -->
    <div v-if="mostRecentStudent.name">
        <div v-if="mostRecentStudent.isPresent" class="alert alert-success">
            Welcome, {{ mostRecentStudent.name }}!
        </div>
        <div v-else class="alert alert-info">
            Goodbye, {{ mostRecentStudent.name }}! See you later!
        </div>
    </div>
</div>
</template>
<style scoped>

    /* CSS styles here */ 
      
</style>