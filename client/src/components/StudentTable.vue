<script setup>
// Importing the student store to access the list of students and related actions
import { useStudentStore } from '../stores/StudentStore';

// Using the student store to get the list of students and related actions
import { storeToRefs } from 'pinia';

// Importing the computed function from Vue to create computed properties
import { computed } from 'vue';

// Importing the StudentRow component to use for each student in the table
import StudentRow from './StudentRow.vue';

// Get the student store instance
const studentStore = useStudentStore();

// Get the student list and student count from the store
const { sortedStudents, studentCount } = storeToRefs(studentStore);

// Function to delete a student, which calls the deleteStudent action in the store
const deleteStudent = (student) => {
    studentStore.deleteStudent(student);
}

// Function to mark a student as arrived or left, which calls the arrivedOrLeft action in the store
const arrivedOrLeft = (student, isStudentPresent) => {
    student.isPresent = isStudentPresent; // update the student's presence status
    studentStore.arrivedOrLeft(student);
}

// Computed property to generate a message about the number of students in the class register
const pluralStudentMessage = computed(() => {
    if (studentCount.value === 1) {
        return 'There is 1 student in class register.'
    } else {
        return `There are ${studentCount.value} students in class register.`
    }
});
</script>

<template>
<div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>
    <div id="student-table">
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>StarID</th>
                    <th>Present?</th>
                    <th>Delete?</th>
                </tr>
            </thead>

            <tbody>
                <!-- v-for loops through students in sortedStudents and creates a StudentRow for each student -->
                <StudentRow v-for="student in sortedStudents"
                v-bind:student="student" 
                v-on:arrived-or-left="arrivedOrLeft"
                v-on:delete-student="deleteStudent" 
                />
            </tbody>

        </table>
    </div>
</div>


</template>
<style scoped>

#student-table {
    max-height: 400px;
    overflow: scroll;
}

th, tr {
    width: 25%;
}

</style>