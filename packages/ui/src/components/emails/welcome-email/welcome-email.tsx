import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import { type WelcomeEmailProps } from './types';

export function WelcomeEmail({
	username,
	imageSrc = 'https://fastly.picsum.photos/id/208/1212/1212.jpg?hmac=UwXtt8JVYBQ3MIVlM_CFxfSeuwyByjtVAt71NpZBu7k',
	imageAlt = 'Brand logo',
	ctaText = 'Get started',
	ctaUrl = 'https://dayowls.com',
	message = 'Welcome to the DayOwls, the one and only readers community.',
	brandName = 'The DayOwls',
	footerText = 'Your friendly neighborhood onboarder from The DayOwls.',
}: WelcomeEmailProps): JSX.Element {
	return (
		<Html>
			<Head />
			<Preview>The DayOwls, the one and only readers community.</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						alt={imageAlt}
						height='50'
						src={imageSrc}
						style={logo}
						width='170'
					/>
					<Text style={paragraph}>Hi {username},</Text>
					<Text style={paragraph}>{message}</Text>
					<Section style={btnContainer}>
						<Button href={ctaUrl} style={button}>
							{ctaText}
						</Button>
					</Section>
					<Text style={paragraph}>
						Best,
						<br />
						{brandName}
					</Text>
					<Hr style={hr} />
					<Text style={footer}>{footerText}</Text>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: '#ffffff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
};

const logo = {
	margin: '0 auto',
};

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
};

const btnContainer = {
	textAlign: 'center' as const,
};

const button = {
	backgroundColor: '#5F51E8',
	borderRadius: '3px',
	color: '#fff',
	fontSize: '16px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	padding: '12px',
};

const hr = {
	borderColor: '#cccccc',
	margin: '20px 0',
};

const footer = {
	color: '#8898aa',
	fontSize: '12px',
};
