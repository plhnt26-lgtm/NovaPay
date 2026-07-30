// ===============================
// NovaPay Script
// ===============================

const SUPABASE_URL = "https://eolbdusxixkkfrgainlc.supabase.co";

const SUPABASE_KEY = "sb_publishable_PxTBl0SHkEUtSp8tFz9Icw_cGmuYfEb";


const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ===============================
// Register
// ===============================

async function register() {

    alert("Start Register");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    console.log(data);
    console.log(error);

    if (error) {
        alert(error.message);
        return;
    }

    alert("SUCCESS");
}

    location.href = "login.html";

}

// ===============================
// Login
// ===============================

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email & password");
        return;
    }

    const { error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        alert(error.message);
        return;
    }

    location.href = "dashboard.html";

}

// ===============================
// Logout
// ===============================

async function logout() {

    await supabase.auth.signOut();

    location.href = "login.html";

}

// ===============================
// Check Login
// ===============================

async function checkLogin() {

    const { data } =
        await supabase.auth.getSession();

    return data.session;

        }
// ===============================
// Load Dashboard
// ===============================

async function loadDashboard() {

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
        window.location.href = "login.html";
        return;
    }

    const user = sessionData.session.user;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    document.getElementById("userName").innerText = data.full_name;
    document.getElementById("balance").innerText = "$" + Number(data.balance).toFixed(2);

}

// បើកតែនៅ Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    loadDashboard();
}
