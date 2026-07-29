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

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const referral = document.getElementById("referral").value.trim();

    if (!fullname || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    if (data.user) {

        const code = Math.random()
            .toString(36)
            .substring(2,8)
            .toUpperCase();

        await supabase
            .from("profiles")
            .insert({
                id: data.user.id,
                full_name: fullname,
                email: email,
                balance: 1,
                total_profit: 0,
                referral_code: code,
                referred_by: referral || null
            });

    }

    alert("Register Success");

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
