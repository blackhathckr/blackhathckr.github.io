import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ShippingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const ShippingForm = ({ onSubmit, loading }: ShippingFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            {...register('street', { required: 'Street address is required' })}
          />
          {errors.street && (
            <p className="text-sm text-destructive mt-1">
              {errors.street.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && (
              <p className="text-sm text-destructive mt-1">
                {errors.city.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              {...register('state', { required: 'State is required' })}
            />
            {errors.state && (
              <p className="text-sm text-destructive mt-1">
                {errors.state.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              {...register('zipCode', { required: 'ZIP code is required' })}
            />
            {errors.zipCode && (
              <p className="text-sm text-destructive mt-1">
                {errors.zipCode.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              onValueChange={(value) => register('country').onChange({ target: { value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
                {/* Add more countries as needed */}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive mt-1">
                {errors.country.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </Button>
    </form>
  );
}; 