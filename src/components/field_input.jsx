import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const Field = (props) => {
  return (
    <div className="my-3 sm:my-5">
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              {props.children ??
                (props.textarea ? (
                  <Textarea {...field} rows={10} placeholder="Type here..." />
                ) : (
                  <Input
                    {...field}
                    type={props.type}
                    placeholder={"Enter " + props.label.toLowerCase()}
                  />
                ))}
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default Field;
