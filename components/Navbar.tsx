import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Image
          src="/eniac-logo.png"
          alt="Logo ENIAC"
          width={180}
          height={60}
          style={{objectFit: "contain"}}
        />
      </div>

      {/* Links centralizados */}
      <ul style={styles.menu}>
      <li>
    <a
      href="https://www.eniac.edu.br/"
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
    >
      Home
    </a>
  </li>

  <li>
    <a
      href="https://www.eniac.edu.br/chat"
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
    >
      Suporte
    </a>
  </li>

<li>
  <Link href="/cadastro" style={linkStyle}>
    Cadastro
  </Link>
</li>

      </ul>

    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 60px",
    background: "linear-gradient(to right, #ffffff, #3b82f6)",
    color: "#000000",
    borderBottom: "none",
    boxShadow: "0 2px 0 0 rgba(59,130,246,0.3)",
    position: "relative",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "40px",
  }
} as const;

const linkStyle = {
  textDecoration: "none",
  fontWeight: "500",
  letterSpacing: "0.5px",
  transition: "0.2s",
};