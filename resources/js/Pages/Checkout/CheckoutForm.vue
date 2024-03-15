<template>
    <form action="" class="mt-10 flex flex-col space-y-4 ">
        <div>
            <InputLabel for="email" value="Email" />
            <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus
                autocomplete="username" />
        </div>
        <div>
            <InputLabel for="number" value="Phone Number" />
            <TextInput id="phone" type="text" class="mt-1 block w-full" v-model="form.phone" required autofocus
            autocomplete="phone" />
        </div>
        <div>
            <InputLabel for="address" value="Address" />
            <TextInput id="address" type="text" class="mt-1 block w-full" v-model="form.address" required autofocus
            autocomplete="address" />
        </div>
        <div class="text-gray-300">
            <InputLabel for="payment" value="Payment Method" />
            <input type="radio" name="payment" value="Cash" class="ml-5"/><span>Cash</span>
            <input type="radio" name="payment" value="esewa" class="ml-5"/><span>E-sewa</span>
        </div>
    </form>
</template>
<script setup>
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    email: '',
    phone: '',
    address: '',

});
</script>
