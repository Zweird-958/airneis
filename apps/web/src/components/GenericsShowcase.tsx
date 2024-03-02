import Input from "@/components/ui/Input"
import { Select, SelectItem } from "@/components/ui/Select"

const GenericsShowcase = () => (
  <div className="flex flex-col gap-8 mx-4">
    <Input />
    <div className="max-w-96">
      <Select>
        {new Array(20).fill(null).map((_, i) => (
          <SelectItem key={i} value={`option-${i}`}>
            Option {i}
          </SelectItem>
        ))}
      </Select>
    </div>
  </div>
)

export default GenericsShowcase
