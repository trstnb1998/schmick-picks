import type { TypographyVariant } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type SectionTitleProps = PropsWithChildren<{
	noMargin?: boolean;
	subtitle?: ReactNode;
	title?: ReactNode;
	titleVariant?: TypographyVariant;
}>;

const SectionTitle = ({ title, titleVariant = "h3" }: SectionTitleProps) => {
	return (
		<Stack direction={"row"} alignItems={"center"} gap={1}>
			<Typography variant={titleVariant}>{title}</Typography>
		</Stack>
	);
};

export { SectionTitle };
