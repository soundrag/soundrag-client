import Model from "../common/Model";

import type { ModelProps } from "../../types/components";

const Speaker = ({ modelName }: ModelProps) => {
	return <Model modelName={modelName} />;
};

export default Speaker;
