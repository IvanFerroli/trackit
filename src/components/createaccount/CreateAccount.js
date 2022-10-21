import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import logo from "../../assets/logo-trackit.png";

function CreateAccount() {
	const [inputValue, setInputValue] = useState({
		email: "",
		name: "",
		image: "",
		password: "",
	});

	const [load, setLoad] = useState(false);

	const navigate = useNavigate();

	console.log(load);

	function sendAccountInfo(e) {
		e.preventDefault();
		setLoad(true);
		const URL =
			"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
		const promise = axios.post(URL, { ...inputValue });
		promise.then((response) => {
			console.log(response);
			navigate("/");
		});
		promise.catch((error) => {
			if (error.status === 409) {
				alert("Usuario e/ou e-mail já existente(s)");
				setLoad(false);
				setInputValue({ email: "", name: "", image: "", password: "" });
			} else {
				alert("Por favor preencha corretamente o formulário");
				setLoad(false);
				setInputValue({ email: "", name: "", image: "", password: "" });
			}
		});
	}

	function showSignUpForm() {
		return (
			<>
				<Input
					disabled={load}
					onChange={(e) => {
						setInputValue({ ...inputValue, email: e.target.value });
					}}
					value={inputValue.email}
					id="email"
					type="email"
					name="q"
					required
					placeholder="email"
					load={load}
				></Input>

				<Input
					disabled={load}
					onChange={(e) => {
						setInputValue({ ...inputValue, password: e.target.value });
					}}
					value={inputValue.password}
					id="password"
					type="password"
					name="a"
					minLength="8"
					required
					placeholder="senha"
					load={load}
				></Input>

				<Input
					disabled={load}
					onChange={(e) => {
						setInputValue({ ...inputValue, name: e.target.value });
					}}
					value={inputValue.name}
					id="name"
					type="text"
					minLength="1"
					name="n"
					required
					placeholder="nome"
					load={load}
				></Input>

				<Input
					disabled={load}
					onChange={(e) => {
						setInputValue({ ...inputValue, image: e.target.value });
					}}
					value={inputValue.image}
					id="image"
					type="text"
					minLength="1"
					name="p"
					required
					placeholder="foto"
					load={load}
				></Input>

				{load ? (
					<Button load={load} type="submit">
						Cadastrar
					</Button>
				) : (
					<Button load={load} type="submit">
						Carregando
					</Button>
				)}
			</>
		);
	}

	return (
		<Container>
			<img src={logo} />
			<h1>TrackIt</h1>
			<SignUpForm onSubmit={sendAccountInfo}>{showSignUpForm()}</SignUpForm>
			<Link to="/">
				<LoginLink>Ja tem uma conta? Faça Login!</LoginLink>
			</Link>
		</Container>
	);
}

export default CreateAccount;

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-family: "Playball";
		font-style: normal;
		font-weight: 400;
		font-size: 69px;
		color: #126ba5;
		margin-bottom: 20px;
	}
	img {
		margin-top: 70px;
		width: 50%;
	}
`;

const LoginLink = styled.span`
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 13.976px;
	text-decoration-line: underline;
	color: #52b6ff;
	cursor: pointer;
`;

const SignUpForm = styled.form`
	 {
		display: flex;
		flex-direction: column;
		width: 85%;
		gap: 6px;
		margin-bottom: 25px;
	}
`;

const Button = styled.button`
	pointer-events: ${(props) => (props.load ? "none" : "auto")};
	opacity: ${(props) => (props.load ? "0.7" : "1")};
	width: 100%;
	height: 45px;
	border-radius: 5px;
	border: none;
	color: #ffffff;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	background-color: #52b6ff;
`;

const Input = styled.input`
	background-color: ${(props) => (props.load ? "#F2F2F2;" : "#FFFFFF;")}
	width: 100%;
	height: 45px;
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	text-indent: 5px;
	font-family: "Lexend Deca";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	color: #dbdbdb;
	::placeholder {
	color: #dbdbdb;
	}

`;