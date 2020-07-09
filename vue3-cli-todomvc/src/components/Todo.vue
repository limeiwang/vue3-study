<template>
  <div class="todoapp">
    <teleport to="#modal">
      <div class="modal" v-if="x<10||y<10"></div>
    </teleport>
    <header class="header" :class="{fixed:top>130}">
      <h1>Vue3 todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <input class="toggle-all" type="checkbox" v-model="allDone" />
      <ul class="todo-list">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="todo"
          :class="{ completed: todo.completed, editing: todo == editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo == editedTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> left
      </span>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >Clear completed</button>
    </footer>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import useAddRemove from "../hooks/addRemove";
import useMousePosition from "../hooks/mouse";
import useScroll from "../hooks/scroll";
export default {
  name: "Todo",

  setup() {
    const state = reactive({
      todos: [
        {
          id: 1,
          title: "吃饭",
          completed: false
        },
        {
          id: 1,
          title: "睡觉",
          completed: false
        }
      ],
      newTodo: "",
      editedTodo: null
    });

    const { addTodo, removeTodo } = useAddRemove(state);

    const { x, y } = useMousePosition();

    const { top } = useScroll();

    const remaining = computed(
      () => state.todos.filter(todo => !todo.completed).length
    );

    const allDone = computed({
      get: function() {
        return remaining.value === 0;
      },
      set: function(value) {
        state.todos.forEach(function(todo) {
          todo.completed = value;
        });
      }
    });

    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo;
    }

    function doneEdit(todo) {
      if (!state.editedTodo) {
        return;
      }
      state.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        removeTodo(todo);
      }
    }

    function cancelEdit(todo) {
      state.editedTodo = null;
      todo.title = state.beforeEditCache;
    }

    function removeCompleted() {
      state.todos = state.todos.filter(todo => todo.completed);
    }

    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      editTodo,
      remaining,
      allDone,
      removeCompleted,
      doneEdit,
      cancelEdit,
      x,
      y,
      top
    };
  },

  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="less">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}
.header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
}
</style>