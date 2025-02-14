import Column from './column'

const Columns = () => {
  return (
    <section className='flex gap-6 overflow-x-auto p-3 h-[calc(100vh-6rem)]'>
      <Column title='Todo' status='TODO' />
      <Column title='In Progress' status='IN_PROGRESS' />
      <Column title='Done' status='DONE' />


    </section>
  )
}
export default Columns 