import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
// Importing mande to create an API client for making requests to the backend API for students
import { mande } from 'mande'

// Create an API client using mande to interact with the backend API for students
const studentAPI = mande('/api/students')

// Define the students store using Pinia
export const useStudentStore = defineStore('students', () => {

    // sortedStudents is a reactive reference that holds an array of student objects sorted alphabetically
    const sortedStudents = ref([])

    // mostRecentStudent is a reactive reference that holds the most recently added student
    const mostRecentStudent = ref ({}) // empty object

    const addNewStudentErrors = ref([]) // reactive reference to hold any errors that occur when adding a new student

    // getAllStudents is a function that makes an API request to get all students and saves the response in the studentList
    function getAllStudents() {
        // make an API request to get all students and  save in store - studentList
        studentAPI.get().then((students) => { // students is the JSON response from the API
            sortedStudents.value = students // update the sortedStudents with the response from the API
        }).catch((err) => {
            console.error('Error fetching students:', err) // Log any errors that occur during the API request for debugging
        })
    }

    // addStudent takes a student object as an argument and adds it to the studentList
    function addStudent(student) {
        // make API call to add new student
        // call getAllStudents to re-request list of students from API server
        studentAPI.post(student).then(() => {
            getAllStudents() // re-request the list of students from the API server to update the studentList with the new student
        }).catch((err) => {
            // If there is an error, save the error message in addNewStudentErrors to display to the user
            addNewStudentErrors.value = err.body
        })
    }

    // deleteStudent takes a student object as an argument and removes it from the studentList
    function deleteStudent(studentToDelete) {
        // Made API call to delete student
        mostRecentStudent.value = {} // Clear the mostRecentStudent since it may have been deleted
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`) // Create an API client for the specific student using their ID
        deleteStudentAPI.delete().then(() => {
            getAllStudents() // Re-request the list of students from the API server to update the studentList with the deleted student removed
        }).catch((err) => {
            console.error('Error deleting student:', err) // Log any errors that occur during the API request for debugging
        })
    }

    // arrivedOrLeft takes a student object as an argument and updates the mostRecentStudent to that student
    function arrivedOrLeft(student) {
        //Updated the mostRecentStudent to the student that arrived or left
        const editStudentAPI = mande(`/api/students/${student.id}`) // Create an API client for the specific student using their ID
        editStudentAPI.patch(student).then(() => {
            mostRecentStudent.value = student // Update the mostRecentStudent with the student that arrived or left
            getAllStudents() // Re-request the list of students from the API server to update the studentList with the changes
        }).catch((err) => {
            console.error('Error updating student:', err) // Log any errors that occur during the API request for debugging
        })
    }

    // studentCount is a computed property that returns the number of students in the studentList
    const studentCount = computed(() => {
        return sortedStudents.value.length
    })

    // sortedStudentList is a computed property that returns a new array of students sorted alphabetically by name
    // const sortedStudentList = computed(() => {
    //     return studentList.value.toSorted((a, b) => {
    //         return a.name.localeCompare(b.name) 
    //     })
    // })
        

    // Return the state and any computed properties or actions that you want to expose from the store
    return {
        // reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        // functions
        getAllStudents,
        addStudent,
        deleteStudent,
        arrivedOrLeft,

        // computed properties
        studentCount,
        //sortedStudentList,
    }
})