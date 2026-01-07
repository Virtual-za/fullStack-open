const Course = ({ course }) => {

  return (

    <div>
      <Header courseName={course.name} />
        <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>


  )
} 

const Header = (props) => {
 
  return (
    <h1>{props.courseName}</h1>
  )
} 
const Content = ({parts}) => {
    return (
     parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>
    )

)
}


const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}
const Courses = ({course}) => {
  return (
    course.map(courses => <Course key={courses.id} course={courses}></Course>)
  )
}






export default Course









