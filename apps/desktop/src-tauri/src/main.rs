// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod markdown_file_list;

use std::path::PathBuf;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn search_markdown_files(selected_folder: String) -> Vec<String> {
    let selected_folder_path = PathBuf::from(selected_folder);
    let markdown_files = markdown_file_list::list_markdown_files_in_folder(&selected_folder_path);
    markdown_files
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![search_markdown_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
