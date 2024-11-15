import Model from "../common/Model";

import type { ModelProps } from "../../types/components";

const Listener = ({ modelName }: ModelProps) => {
	return <Model modelName={modelName} />;
};

export default Listener;
