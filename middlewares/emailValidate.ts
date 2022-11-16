export default async (email, func) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegEx.test(email)) {
        return func()
    } else {
        return 'email указан некорректно'
    }
}