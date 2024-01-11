import ProductList from "@/components/ProductList"
import api from "@/trpc/server"

const Home = async () => {
  const products = await api.products.all.query()

  if (!products) {
    return <p>nothin</p>
  }

  return (
    <div>
      <p className="text-xl">Server</p>
      {products.result.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
      <ProductList />
    </div>
  )
}

export default Home
