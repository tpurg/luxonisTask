import { FlatModel } from "../../../models/flat.model";
import "./flat.css";

interface FlatProps {
  flat: FlatModel;
}

export const Flat = (props: FlatProps) => {
  return (
    <div className="flat" key={`flat${props.flat.id}`}>
      <img className="flatImage" src={props.flat.url}></img>
      <p className="flatTitle">{props.flat.name}</p>
    </div>
  );
};
