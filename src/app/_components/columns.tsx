import Column from './column'

const Columns = () => {
  return (
    <section className='mt-10 flex gap-12 overflow-x-auto p-3 h-[400px]'>
      <Column title='Todo' status='TODO' />
      <Column title='In Progress' status='IN_PROGRESS' />
      <Column title='Done' status='DONE' />
    </section>
  )
}
export default Columns 