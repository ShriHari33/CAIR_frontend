import numpy as np
# import matplotlib.pyplot as plt

num_architectures = 50
upper_bound = [6, 5, 4, 3, 2, 1, 6, 5, 4, 3, 2, 1, 6, 5, 4, 3, 2, 1, 5, 0, 0, 5, 0, 0]
lower_bound = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0]

def generate_architectures(num_architectures):
    architectures = []
    for _ in range(num_architectures):
        architecture = []
        for i in range(len(upper_bound)):
            # Using discrete uniform distribution
            value = np.random.randint(lower_bound[i], upper_bound[i] + 1)
            architecture.append(value)
        architectures.append(architecture)
    return architectures

def calculate_distance(arch1, arch2):
    return np.sqrt(np.sum((np.array(arch1) - np.array(arch2))**2))

def calculate_complexity(architecture):
    return sum(architecture)

def select_diverse_architectures(architectures, num_architectures):
    selected_architectures = []
    remaining_architectures = architectures.copy()

    while len(selected_architectures) < num_architectures:
        if not remaining_architectures:
            break
        max_distance = 0
        best_architecture = None
        for architecture in remaining_architectures:
            min_distance = float('inf')
            for selected in selected_architectures:
                distance = calculate_distance(architecture, selected)
                min_distance = min(min_distance, distance)
            if min_distance > max_distance:
                max_distance = min_distance
                best_architecture = architecture
        selected_architectures.append(best_architecture)
        remaining_architectures.remove(best_architecture)

    return selected_architectures

all_architectures = generate_architectures(num_architectures)
selected_architectures = select_diverse_architectures(all_architectures, num_architectures)

# Calculate complexities of selected architectures
complexities = [calculate_complexity(arch) for arch in selected_architectures]

# Calculate the total complexity of selected architectures
total_complexity = sum(complexities)

# Calculate the total complexity of the minimum and maximum possible architectures
min_possible_complexity = sum(lower_bound)
max_possible_complexity = sum(upper_bound)

# Plot the complexities
# plt.plot(range(1, len(complexities) + 1), complexities, marker='o', linestyle='-', color='b', label='Selected Architectures')
# plt.axhline(y=min_possible_complexity, color='r', linestyle='--', label='Minimum Possible Complexity')
# plt.axhline(y=max_possible_complexity, color='g', linestyle='--', label='Maximum Possible Complexity')
# plt.xlabel('Architecture')
# plt.ylabel('Complexity')
# plt.title('Complexity of Selected Architectures')
# plt.legend()
# plt.show()

for idx, architecture in enumerate(selected_architectures, start=1):
    print(f"Architecture {idx}: {architecture}")

print(f"Total complexity of selected architectures: {total_complexity}")
print(f"Minimum possible complexity: {min_possible_complexity}")
print(f"Maximum possible complexity: {max_possible_complexity}")
